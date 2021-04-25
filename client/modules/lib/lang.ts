import translation from './langs/en'

export default (words: string): string => {
  return translation[words] || words
}
