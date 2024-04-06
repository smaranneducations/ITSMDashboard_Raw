import {createComment,findComments} from  '../utils/databaseCRUD/CRUDComment.js'


// const bhasker = findComments()
const bhasker = async() =>{
  try {
    const response = await findComments();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
bhasker();