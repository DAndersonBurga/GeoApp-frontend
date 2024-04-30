export type FeaturePage = {
    data: Feature[]
    pagination: FeaturePagination
}

export type FeaturePagination = {
    total: number
    current_page: number
    per_page: number
}

export type Feature = {
    id: number
    type: string
    attributes: FeatureAttributes
    links: FeatureLinks
}

export type FeatureAttributes = {
    mag_type: string
    place: string
    external_id: string,
    magnitude: number,
    tsunami: boolean,
    title: string
    time: string
    longitude: number
    latitude: number
}

export type FeatureLinks = {
    external_url: string
}

export type FeatureWithMessages = Feature & {
    comments: Comment[]
}

export type Comment = {
    id: number
    body: string
}