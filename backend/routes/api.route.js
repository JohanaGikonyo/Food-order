const express = require('express');
const bcrypt = require('bcrypt')

const path = require('path')
const { PrismaClient } = require('@prisma/client');
const upload = require('./upload');

const router = express.Router();

// Apply CORS middleware to all routes

const prisma = new PrismaClient();

// Connect to Prisma client
prisma.$connect()
  .then(() => { console.log("Database Connected Successfully!"); })
  .catch(error => { console.error("Error Connecting to the Database!", error); });



// Define route to check if API is working
router.get('/', async (req, res, next) => {
  res.send({ message: 'API is working 🚀' });
});

// Define route to handle file uploads
router.post('/uploadbreakfast', upload.single('file'), async (req, res, next) => {
  try {
    const { name, price, description } = req.body;
    const filename = req.file.filename;

    const foods = await prisma.food.create({
      data: {
        file: filename,
        name,
        price: parseFloat(price),
        description
      }
    });

    res.json('uploaded');
  } catch (error) {
    next({ status: 500, message: error.message || 'Internal Server Error' });
  }
});
router.post('/uploadlunch', upload.single('file'), async (req, res, next) => {
  try {
    const { name, price, description } = req.body;
    const filename = req.file.filename;

    const foods = await prisma.lunch.create({
      data: {
        file: filename,
        name,
        price: parseFloat(price),
        description
      }
    });

    res.json('uploaded');
  } catch (error) {
    next({ status: 500, message: error.message || 'Internal Server Error' });
  }
});
router.post('/uploadsuper', upload.single('file'), async (req, res, next) => {
  try {
    const { name, price, description } = req.body;
    const filename = req.file.filename;

    const foods = await prisma.super.create({
      data: {
        file: filename,
        name,
        price: parseFloat(price),
        description
      }
    });

    res.json('uploaded');
  } catch (error) {
    next({ status: 500, message: error.message || 'Internal Server Error' });
  }
});
router.post('/verify', async (req, res, next) => {
  try {
    const { password } = req.body;
    const pass = await prisma.verify.findUnique({ where: { password: parseInt(password) } });
    if (pass) {
      res.json("verified");
    } else {
      res.json("Unauthorized Access");
    }
  } catch (error) {
    next(error);
  }
});


// Define route to fetch uploads
router.get('/getbreakfast', async (req, res, next) => {
  try {
    const foods = await prisma.food.findMany();
    res.json(foods);
  } catch (error) {
    next(error);
  }
});
router.get('/getlunch', async (req, res, next) => {
  try {
    const foods = await prisma.lunch.findMany();
    res.json(foods);
  } catch (error) {
    next(error);
  }
});
router.get('/getsupper', async (req, res, next) => {
  try {
    const foods = await prisma.super.findMany();
    res.json(foods);
  } catch (error) {
    next(error);
  }
});



//Login and SignIn
router.post('/signin', async (req, res, next) => {
  const { email, password } = req.body;


  try {

    const user = await prisma.user.findUnique({ where: { email: email } })
    const hashedPassword = await bcrypt.hash(password, 10)
    if (user) {
      res.json("user exists")
    }
    else {

      await prisma.user.create({ data: { email: email, password: hashedPassword } })
      res.json("submitted")

    }

  } catch (error) {
    next(error)

  }
})

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email: email, password: password } })
    if (user) {
      res.json("user exists")
    }
    else {
      res.json("user dont exist")
    }

  } catch (error) {
    next(error)

  }
})

router.post('/deletebreakfast/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const findItem = await prisma.food.findUnique({ where: { id: parseInt(id) } })
    if (findItem) {
      await prisma.food.delete({ where: { id: parseInt(id) } })
      res.json("deleted")
    }
    else {
      res.json("not deleted")
    }


  } catch (error) {
    next(error)

  }
})
router.post('/deletelunch/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const findItem = await prisma.lunch.findUnique({ where: { id: parseInt(id) } });
    if (findItem) {
      await prisma.lunch.delete({ where: { id: parseInt(id) } });
      res.json("deleted");
    } else {
      res.json("not deleted");
    }
  } catch (error) {
    next(error);
  }
});

router.post('/deletesupper/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const findItem = await prisma.super.findUnique({ where: { id: parseInt(id) } });
    if (findItem) {
      await prisma.super.delete({ where: { id: parseInt(id) } });
      res.json("deleted");
    } else {
      res.json("not deleted");
    }
  } catch (error) {
    next(error);
  }
});
router.patch('/updatebreakfast/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  const { name, price, description } = req.body;
  const filename = req.file.filename;
  try {
    const updated = await prisma.food.update({
      where: { id: id }, data: {
        name: name,
        price: price,
        description: description,
        ...(filename && { filename: filename })
      }
    })
    res.json("updated")

  } catch (error) {
    next(error)

  }
})
router.patch('/updatelunch/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  const { name, price, description } = req.body;
  const filename = req.file ? req.file.filename : null; // Check if req.file exists

  try {
    const updatedLunch = await prisma.lunch.update({
      where: { id: id },
      data: {
        name: name,
        price: price,
        description: description,
        ...(filename && { filename: filename })
      }
    });
    console.log(updatedLunch)
    res.json("updated");
  } catch (error) {
    console.error('Error updating lunch item:', error);
    next(error);
  }
});

router.patch('/updatesupper/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  const { name, price, description } = req.body;
  const filename = req.file ? req.file.filename : null; // Check if req.file exists
  try {
    const updated = await prisma.super.update({
      where: { id: id }, data: {
        name: name,
        price: price,
        description: description,
        ...(filename && { filename: filename })
      }
    })
    res.json("updated")

  } catch (error) {
    next(error)

  }
})


module.exports = router;
