
import { getPayload } from 'payload'
import config from '@payload-config'

export const payload = await getPayload({ config })


// export async function payload() {

//     try {
//         const payload = await getPayload({ config })

//         return payload
//     } catch (error) {
//         throw new Error(`Error creating post: ${error.message}`)
//     }
// }