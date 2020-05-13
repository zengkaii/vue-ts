import ProjectConfig, {ProjectConfigType} from '@/model/ProjectConfig'

export class Config implements ProjectConfig {
    public httpRoot = ''
    // public publicPath = ''
    public type = ProjectConfigType
}
