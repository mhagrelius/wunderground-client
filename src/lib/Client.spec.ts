import test from 'ava'
import axios from 'axios'
import sinon from 'sinon'
import { ConditionsResponse } from '../types/conditions-response.js'
import sampleConditionsResponse from '../types/conditions-response.sample.json'
import Client from './Client'

test('requires non-empty api key', t => {
  t.throws(() => new Client(''))
})

test.serial('getCurrentConditions handles valid request', async t => {
  const stubResponse = {
    config: {},
    data: sampleConditionsResponse as ConditionsResponse,
    headers: {},
    status: 200,
    statusText: ''
  }
  sinon.stub(axios, 'get').returns(new Promise(r => r(stubResponse)))

  const client = new Client('FakeKey')
  const result = await client.getCurrentConditions('FakeCity', 'FS')

  t.is(result.description, 'Partly Cloudy')
  t.is(result.temperature, 66.3)
  t.is(result.dewpoint, 54)
  t.is(result.feelslike, 66.3)
  t.is(result.wind.direction, 'NNW')
  t.is(result.wind.speed, 22)
  sinon.restore()
})

test('getCurrentConditions requires a city', async t => {
  await t.throwsAsync(async () => {
    const client = new Client('FakeKey')
    // tslint:disable-next-line:variable-name
    await client.getCurrentConditions('', 'Illinois')
  })
})

test('getCurrentConditions requires a state', async t => {
  await t.throwsAsync(async () => {
    const client = new Client('FakeKey')
    // tslint:disable-next-line:variable-name
    await client.getCurrentConditions('FakeCity', '')
  })
})

test('getCurrentConditions requires two-letter state', async t => {
  await t.throwsAsync(async () => {
    const client = new Client('FakeKey')
    // tslint:disable-next-line:variable-name
    await client.getCurrentConditions('FakeCity', 'I')
  })

  await t.throwsAsync(async () => {
    const client = new Client('FakeKey')
    // tslint:disable-next-line:variable-name
    await client.getCurrentConditions('FakeCity', 'Illinois')
  })
})

test.serial('getCurrentConditions throws on http request errors', async t => {
  sinon.stub(axios, 'get').rejects(new Error('404'))
  await t.throwsAsync(async () => {
    const client = new Client('FakeKey')
    await client.getCurrentConditions('FakeCity', 'FS')
  })
  sinon.restore()
})
