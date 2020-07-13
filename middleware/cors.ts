import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
   methods: ['GET']
})

export default cors