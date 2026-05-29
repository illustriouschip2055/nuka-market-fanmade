import { prisma } from "../lib/prisma.js"

export const getAllProducts = async () => {
  try {
    const data = await prisma.product.findMany()
    //console.log(data)
    return data
  } catch (err) {
    console.error("ERROR:", err)
    throw err
  }
}

export const getProduct = async (id: number) => {
  try {
    const product = await prisma.product.findUnique ({
      where: { id }
    })
    return product
  } catch (err) {
    console.log ("EROR:", err)
    throw err
  }
}
