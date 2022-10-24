import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import cn from 'classnames'
import { Typography } from "antd"
import type { FileRejection } from "react-dropzone"
import type { SetFieldValue } from "../AddTrackView/AddTrackForm"
import getAudioDuration from "../../utils/getAudioDuration"
import { FormikErrors, FormikProps } from "formik"
import { InitialValues } from "../AddTrackView/AddTrackForm"

const { Text } = Typography

interface Props {
    acceptFormat: string,
    setFile: Function,
    fieldName: string,
    errors?: any | null, 
    withPreview?: boolean
}

export interface FileWithAdditionalData {
    file: File,
    additionalData: {
        mbsize: number,
        preview?: string,
        duration?: number
    }
}

const UploadFileDropzone = ({ acceptFormat, setFile, fieldName, withPreview, errors }: Props): JSX.Element => {
    const onDrop = useCallback(async (acceptedFile: File[], rejectedFiles: FileRejection[]): Promise<void> => {
        const originalFile = acceptedFile[0]

        if(originalFile) {
            const mbsize = +(originalFile.size / 1024 / 1024).toFixed(2)

            const file: FileWithAdditionalData = {
                file: acceptedFile[0],
                additionalData: {
                    mbsize 
                }
            }

            const reader = new FileReader()
            reader.readAsDataURL(originalFile)
            reader.onload = function() {
                console.log(reader.result)
            }

            if(acceptFormat.includes('audio')) {
                const duration = await getAudioDuration(URL.createObjectURL(originalFile))
                file.additionalData.duration = Math.floor(duration)
            }
            if(withPreview) file.additionalData.preview = URL.createObjectURL(originalFile)
            
            setFile(fieldName, file)
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({ onDrop, multiple: false, accept: {[acceptFormat]: []} })

    return (
        <div 
            {...getRootProps()}
            className={cn(
                "h-full flex items-center justify-center border-[2px] ease-in-out duration-300 rounded-xl border-dashed border-[#177ddc]/30 cursor-pointer hover:border-[#177ddc]/50 hover:bg-[#177ddc]/10",
                `${isDragActive && "border-[#177ddc]/80 bg-[#177ddc]/10"}`,
                `${(isDragReject || errors) && "border-rose-500/80 bg-rose-500/10"}`
            )}
        >
            <input {...getInputProps()}/>
            <Text className="flex text-center text-lg ease-in-out duration-300">
                {
                    errors 
                        ? <>
                            {errors}<br/>
                            Choose another one
                        </> 
                        : isDragReject 
                            ? <>Incorrect file format!</>
                            : isDragActive 
                                ? <>Drop the file!</> 
                                : <>Drag file to zone <br/> Or click for upload</>
                }
            </Text>
        </div>
    )
}

export default UploadFileDropzone