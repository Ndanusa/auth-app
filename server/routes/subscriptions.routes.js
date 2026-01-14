import {Router} from 'express'

const router = Router()

router.get('/api/v1/auth', (req, res) => {
    res.send('this is a get route for the subscriptions')
})

router.post('/api/v1/auth', (req, res) => {
    res.send('this is a post route for the subscriptions')
})

router.put('/api/v1/auth', (req, res) => {
    res.send('this is a get put for the subscriptions')
})

router.delete('/api/v1/auth', (req, res) => {
    res.send('this is a get delete for the subscriptions')
})

module.exports = router