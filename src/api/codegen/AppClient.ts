/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest'
import type { OpenAPIConfig } from './core/OpenAPI'
import { AxiosHttpRequest } from './core/AxiosHttpRequest'

import { ArticleService } from './services/ArticleService'
import { ExerciseService } from './services/ExerciseService'
import { FeedService } from './services/FeedService'
import { FoodService } from './services/FoodService'
import { GymLibApiVersion1000CultureNeutralPublicKeyTokenNullService } from './services/GymLibApiVersion1000CultureNeutralPublicKeyTokenNullService'
import { SleepService } from './services/SleepService'
import { StatService } from './services/StatService'
import { TrainingService } from './services/TrainingService'
import { UserService } from './services/UserService'

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest

export class AppClient {
  public readonly article: ArticleService
  public readonly exercise: ExerciseService
  public readonly feed: FeedService
  public readonly food: FoodService
  public readonly gymLibApi: GymLibApiVersion1000CultureNeutralPublicKeyTokenNullService
  public readonly sleep: SleepService
  public readonly stat: StatService
  public readonly training: TrainingService
  public readonly user: UserService

  public readonly request: BaseHttpRequest

  constructor(
    config?: Partial<OpenAPIConfig>,
    HttpRequest: HttpRequestConstructor = AxiosHttpRequest
  ) {
    this.request = new HttpRequest({
      BASE: config?.BASE ?? '',
      VERSION: config?.VERSION ?? '1.0',
      WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
      CREDENTIALS: config?.CREDENTIALS ?? 'include',
      TOKEN: config?.TOKEN,
      USERNAME: config?.USERNAME,
      PASSWORD: config?.PASSWORD,
      HEADERS: config?.HEADERS,
      ENCODE_PATH: config?.ENCODE_PATH
    })

    this.article = new ArticleService(this.request)
    this.exercise = new ExerciseService(this.request)
    this.feed = new FeedService(this.request)
    this.food = new FoodService(this.request)
    this.gymLibApi = new GymLibApiVersion1000CultureNeutralPublicKeyTokenNullService(this.request)
    this.sleep = new SleepService(this.request)
    this.stat = new StatService(this.request)
    this.training = new TrainingService(this.request)
    this.user = new UserService(this.request)
  }
}
