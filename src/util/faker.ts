import { faker } from '@faker-js/faker'

export function fkWords(cnt: number, uppercase = false) {
  const t = faker.lorem.words(cnt)
  return uppercase ? t.toUpperCase() : t
}

export function fkSentence(ctn: number) {
  return faker.lorem.sentence(ctn)
}
