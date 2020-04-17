import { GlobalType } from '@/global'
import GlobalDefine from '@/global/globalDefine'

export const ProjectConfigType = new GlobalDefine<ProjectConfig>(Symbol('project-config'))
export default interface ProjectConfig extends GlobalType {
    httpRoot: string
    // publicPath: string
}
