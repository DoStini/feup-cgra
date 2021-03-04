# CGRA 2020/2021

## Group T04G02

## TP 3 Notes

### Exercise 1

- To create the normals of the cube, we had to create new vertices and new faces, repeating vertices to allocate the normals for each face.
- To insert the normals in the tangram figures, we just had to individually place the normals in the Objects, according to their initial state.
- Finally, for the materials, we refactored a bit of the project structure. First we created a class Material, that initializes material acordding to a material javascript object passed by parameter. This class is defined under Utils folder, and the corresponding material javascript objects are under the folder Materials. This helped us to make some cleaner code and a more organized folder structure.
- About the materials itself, in the tangram, we chose a specular component close to white, and applied it for all of the materials in the tangram. We also chose the shininess value to be 10, because it looked best under the lack of object complexity.
