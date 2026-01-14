import {Router} from 'express';

const router = Router();


router.get('/v1/auth/subscriptions', (req, res) => {
    res.send('This is the subscriptions route in get method')
})

router.post('/v1/auth/subscriptions', (req, res) => {
    res.send('This is the subscriptions router in post method')
})


router.put('/v1/auth/subscriptions', (req, res) => {
    res.send('This is the subscriptions router in put method')
})

router.delete('/v1/auth/subscriptions', (req, res) => {
    res.send('This is the subscriptions router in delete method')
})


module.exports = router