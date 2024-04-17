import nock from 'nock';
import axios from 'axios';


const apiUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3001"
axios.defaults.baseURL = apiUrl

describe("ai report ",() => {
  beforeEach(()=>{
    nock.cleanAll()

    nock(apiUrl).post("/user/register").reply(201)
    nock(apiUrl).post("/user/login").reply(201)
  })

  test("login", async () => {
    
  })
})