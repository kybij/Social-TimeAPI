const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    addFriend,
    deleteFriend
    
} = require('../../controllers/user-controller')

router

.route('/')
.get(getAllUsers)
.post(createUser)

router

.route('/:id')
.get(getUserById)
.put(updateUserById)
.delete(deleteUserById)

router

.route('/:id/friends/:friendId')
.post(addFriend)
.delete(deleteFriend)


module.exports = router;