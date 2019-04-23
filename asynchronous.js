// 1. callbacks

mongoose.connect(url, (err, result) => {
  if 
  console.log('connected');
  mongoose.collection.find( )
})


// 2. .then promises

mongoose.connect(url)
        .then(() => return mongoose.find())
        .then()
        .catch()

// 3. async / await
const whatever = async () => {
  try {
    await mongoose.connect(url);
    const user = await mongoose.find({user :});
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }

}
