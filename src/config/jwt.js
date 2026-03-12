import fs from 'fs'
import path from 'path'

export const publicKey = fs.readFileSync(path.join(process.cwd(), "keys/public.key"), 'utf8')