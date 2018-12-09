import axios from 'axios'
import debug from 'debug'
import { ConditionsResponse } from '../types/conditions-response'

export interface CurrentConditions {
  description: string
  temperature: number
  dewpoint: number
  feelslike: number
  wind: {
    direction: string
    speed: number
  }
}

/**
 * A wrapper around the Weather Underground REST API
 */
export default class Client {
  private readonly apiKey: string
  private readonly baseUrl: string
  private readonly logger: debug.IDebugger

  constructor(apiKey: string) {
    this.logger = debug('wunderground-client')
    if (!apiKey) {
      const errorMessage = 'A valid api key must be provided'
      this.logger.log(errorMessage)
      throw new Error(errorMessage)
    } else {
      this.apiKey = apiKey
    }
    this.baseUrl = `https://api.wunderground.com/api/${this.apiKey}`
  }

  /**
   * Retrieves and parses the current conditions
   * @param city
   * @param stateAbbreviation
   */
  public async getCurrentConditions(
    city: string,
    stateAbbreviation: string
  ): Promise<CurrentConditions> {
    this.validateCityStateInput(city, stateAbbreviation)
    try {
      const result = await axios.get<ConditionsResponse>(
        `${
          this.baseUrl
        }/conditions/q/${stateAbbreviation}/${city
          .trim()
          .replace(' ', '_')}.json`
      )
      return {
        description: result.data.current_observation.weather,
        dewpoint: result.data.current_observation.dewpoint_f,
        feelslike: parseFloat(result.data.current_observation.feelslike_f),
        temperature: result.data.current_observation.temp_f,
        wind: {
          direction: result.data.current_observation.wind_dir,
          speed: result.data.current_observation.wind_mph
        }
      }
    } catch (e) {
      this.logger.log(
        `An error occurred while attempting to retrieve the current conditions.`
      )
      throw e
    }
  }

  /**
   * throws an error if either parameter is malformed.
   * @param city
   * @param stateAbbreviation
   */
  private validateCityStateInput(city: string, stateAbbreviation: string) {
    if (!city) {
      throw new Error('A valid city is required.')
    }
    if (!stateAbbreviation || stateAbbreviation.length !== 2) {
      throw new Error('A valid 2-letter state abbreviation is required')
    }
  }
}
