
import express from "express";
import { Book } from "../models/bookModels.js";
const router =express.Router();

// Route for save a new book
router.post("/", async (request, response) => {
    try {
      const { title, author, publishYear } = request.body;
  
      if (!title || !author || !publishYear) {
        return response.status(400).send({
          message: "Send all required fields: title, author, publishYear",
        });
      }
  
      const book = new Book({
        title,
        author,
        publishYear,
      });
  
      await book.save();
  
      response.status(201).send(book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  // get all books from database
  
  router.get("/",async(request,response)=>{
      try {
          const books = await Book.find({});
          return response.status(200).json({
              count:books.length,
              data:books
          })
      } catch (error) {
          console.log(error.message);
          response.status(500).send({ message: error.message });
      }
  })
  
  // get one book with ID from database 
  
  router.get("/:id",async(request,response)=>{
      try {
          const {id}=request.params;
          const books = await Book.findById(id);
          return response.status(200).json(books)
      } catch (error) {
          console.log(error.message);
          response.status(500).send({ message: error.message });
      }
  })
  //  updata books from database
  router.put("/:id",async(request,response)=>{
  
      try {
          const { title, author, publishYear } = request.body;
          if (!title || !author || !publishYear) {
              return response.status(400).send({
                message: "Send all required fields: title, author, publishYear",
              });
            }
            const {id}=request.params;
            const result= await Book.findByIdAndUpdate(id,request.body)
            if(!result){
              return response.status(500).json({message:error.message});
            }
            return response.status(200).send({message:"Book updated successfully"})
          
      } catch (error) {
          console.log(error.message);
          response.status(500).send({ message: error.message });
      }
  })
  
  //  Detele books from database
  router.delete("/:id",async(request,response)=>{
    try {
      const {id}=request.params;
      const result= await Book.findByIdAndDelete(id);
      if(!result){
        return response.status(404).send({message:"Book note Found"})
      }
      return response.status(200).send({message:"Book deleted successfully"})
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  })

  export default router;