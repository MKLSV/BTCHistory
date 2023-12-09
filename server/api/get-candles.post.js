import getCandles from '../service/btc-service';
import { dbService } from '../service/db.service';

export default defineEventHandler(async (event) => {
  const data = (await readBody(event))
  const DB_NAME = data.type
  try {
    const collection = await dbService.getCollection(DB_NAME)
    const DBdata = await collection.find().toArray()
    if (DBdata.length === 0 || data.type === 'Custom') {
      const newData = await getCandles(data)
      add(newData, data.type)
      return newData
    }
    else return DBdata[0].list
  } catch (err) {
    console.log('cannot find stories', err)
    throw err
  }
}
  //   const response = await getCandles(data)
  // return response.list
)