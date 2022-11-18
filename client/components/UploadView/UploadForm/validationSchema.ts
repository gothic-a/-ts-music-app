import * as yup from 'yup'

export const validationSchema = (
    yup.object().shape({
        track: yup.object().shape({
            additionalData: yup.object().shape({
                mbsize: yup.number().required().nullable().max(20, 'Your file bigger than 20MB.').nullable(),
                duration: yup.number().required().max(3600, 'Your track longer then 1 hour.')
            })
        }),
        image: yup.object().shape({
            additionalData: yup.object().shape({
                mbsize: yup.number().required().max(1, 'Your file bigger than 1MB.'),
                preview: yup.string().required(),
            })
        }),
        description: yup.object().shape({
            artist: yup.string().required(),
            name: yup.string().required(),
        })
    })
)