import {Router} from 'express';

const router = Router();


router.get('/v1/auth/user', (req, res) => {
    res.send('This is the users route in get method')
})

router.post('/v1/auth/user', (req, res) => {
    res.send('this is the users router in post method')
})


router.put('/v1/auth/user', (req, res) => {
    res.send('this is the users router in put method')
})

router.delete('/v1/auth/user', (req, res) => {
    res.send('this is the users router in delete method')
})


module.exports = router