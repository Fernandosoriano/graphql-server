const express = require('express');
const {graphqlHTTP}  = require('express-graphql');
const { buildSchema } = require('graphql');
//data
const {courses}= require('./data.json');
console.log(courses);
const schema = buildSchema(`
    type Mutation{
        updateCourseTopic(id:Int!, topic:String!): Course
    }
    type Query {
        message: String
        course(id:Int!):Course
        courses(topic:String): [Course]
    }
    type Course {
            id: Int
            title: String
            author: String
            topic:String
            url: String
    }
    
`);

let getCourse = (args) =>{
let id = args.id
return courses.filter(course =>{
    return course.id == id
})[0]
}
let getcourses = (args) =>{
    if (args.topic){
    let topic = args.topic
    return courses.filter(course =>{
        return course.topic === topic
    });
}
else{
return courses;
}
};
let updateCourseTopic  = ( {id, topic})=>{
courses.map(course =>{
    if (course.id === id){
        course.topic = topic
        return course;
    }
})
return courses.filter(course =>course.id === id)[0];
}
const root = {
    message: () =>{
     return   "hello world!"
    },
    course: getCourse,
    courses: getcourses,
    updateCourseTopic:updateCourseTopic
};
const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true

})); 


app.listen(3000, () => {
    console.log('serve run on port 3000');
});