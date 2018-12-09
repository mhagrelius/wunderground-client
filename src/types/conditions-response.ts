export interface ConditionsResponse {
  response: Response
  current_observation: CurrentObservation
}

export interface CurrentObservation {
  image: Image
  display_location: Location
  observation_location: Location
  estimated: {}
  station_id: string
  observation_time: string
  observation_time_rfc822: string
  observation_epoch: string
  local_time_rfc822: string
  local_epoch: string
  local_tz_short: string
  local_tz_long: string
  local_tz_offset: string
  weather: string
  temperature_string: string
  temp_f: number
  temp_c: number
  relative_humidity: string
  wind_string: string
  wind_dir: string
  wind_degrees: number
  wind_mph: number
  wind_gust_mph: string
  wind_kph: number
  wind_gust_kph: string
  pressure_mb: string
  pressure_in: string
  pressure_trend: string
  dewpoint_string: string
  dewpoint_f: number
  dewpoint_c: number
  heat_index_string: string
  heat_index_f: string
  heat_index_c: string
  windchill_string: string
  windchill_f: string
  windchill_c: string
  feelslike_string: string
  feelslike_f: string
  feelslike_c: string
  visibility_mi: string
  visibility_km: string
  solarradiation: string
  UV: string
  precip_1hr_string: string
  precip_1hr_in: string
  precip_1hr_metric: string
  precip_today_string: string
  precip_today_in: string
  precip_today_metric: string
  icon: string
  icon_url: string
  forecast_url: string
  history_url: string
  ob_url: string
}

export interface Location {
  full: string
  city: string
  state: string
  state_name?: string
  country: string
  country_iso3166: string
  zip?: string
  latitude: string
  longitude: string
  elevation: string
}

export interface Image {
  url: string
  title: string
  link: string
}

export interface Response {
  version: string
  termsofService: string
  features: Features
}

export interface Features {
  conditions: number
}
