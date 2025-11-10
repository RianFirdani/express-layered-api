const express = require('express')
const { PrismaClient } = require('@prisma/client')
const cors = require('cors')

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
    const data = await prisma.product.findMany()
    res.send(data)
})

app.get('/:id', async (req, res) => {
    const {id} = req.params
    await prisma.product.findFirst({
      where : {
        id : Number(id)
      }
    })
    res.send(data)
});


app.post('/', async (req, res) => {
    const { name, price, image } = req.body
    await prisma.product.create({
        data: {
            name,
            price,
            image
        }
    })
    res.send('Berhasil Input')
})

app.delete('/:id', async (req, res) => {
    const { id } = req.params
    await prisma.product.delete({
        where: {
            id: Number(id)
        }
    })
    res.send(`Berhasil hapus id : ${id} `)
})

app.put('/:id', async (req, res) => {
    const { id } = req.params
    const { name, price, image } = req.body

    await prisma.product.update({
        where: {
            id : Number(id)
        },
        data: {
            name,
            price,
            image
        }
    })
        res.send(`Berhasil update id : ${id} `)
})

app.listen(PORT, () => {
    console.log(`Server is Listening oon Port : ${PORT}`)
})