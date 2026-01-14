import {Router} from 'express'

const router = Router()

router.get('/api/v1/auth', (req, res) => {
    res.send('this is a get route for the users')
})

router.post('/api/v1/auth', (req, res) => {
    res.send('this is a post route for the users')
})

router.put('/api/v1/auth', (req, res) => {
    res.send('this is a get put for the users')
})

router.delete('/api/v1/auth', (req, res) => {
    res.send('this is a get delete for the users')
})

module.exports = router