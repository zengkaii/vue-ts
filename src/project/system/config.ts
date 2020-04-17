import ProjectConfig, {ProjectConfigType} from '@/model/ProjectConfig'

export class Config implements ProjectConfig {
    public httpRoot = '/admin'
    // public publicPath = ''
    public type = ProjectConfigType
}
