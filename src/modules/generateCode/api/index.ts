import { request } from '@/utils/request'
import type { GenerateCodeColumn, GenerateCodeExecuteRequest } from '@/modules/generateCode/api/type.ts'
import type { FileResult } from '@/utils/request/type.ts'

export const generateCodedApi = {
  tables() {
    return request.get<string[]>('generate_code/tables')
  },
  columns(tableName: string) {
    return request.get<GenerateCodeColumn[]>('generate_code/columns', {
      table_name: tableName
    })
  },
  checkBackEnd(req: GenerateCodeExecuteRequest) {
    return request.post<string[]>('generate_code/check_back_end', req)
  },
  backEnd(req: GenerateCodeExecuteRequest) {
    return request.post<string[]>('generate_code/back_end', req)
  },
  frontEnd(req: GenerateCodeExecuteRequest): Promise<FileResult> {
    return request.postFile('generate_code/front_end', req)
  }
}
