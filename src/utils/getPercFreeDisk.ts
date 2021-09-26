import disk from 'diskusage'

const getPercFreeDisk = async (): Promise<number> => {
  const { available, total } = await disk.check('D:')
  const perc_available = Math.round(available / total * 10000) / 100
  return perc_available
}

export default getPercFreeDisk
