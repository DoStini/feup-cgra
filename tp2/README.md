# CGRA 2020/2021

## Group T0xG0y

## TP 2 Notes

### Exercise 1

- We chose the right lower corner of the blue big triangle as the center of the image
- We had to calculate some translation values for the orange triangle. From the original position
  - Rotate -45º
  - Translate sqrt(2) in the y axis. sqrt(2) is half of the side of the triangle
  - Translate 2-sqrt(2) in the x axis. 2 is half the base of the triangle and sqrt(2) is half of the smaller side of the triangle
- For the pink triangle:
  - Rotate 45º
  - Translate 2+sqrt(2) to the left in the x axis. sqrt(2) is half of the size of the hypotenuse of the pink triangle, 2 is half of the size of the big triangle.
- For the diamond:
  - Math.sqrt(2)+1 - 2 + Math.sqrt(2) was applied
    - Math.sqrt(2)+1 is the translation applied so that the vertex of the head touches the untranslated body triangle
    - -2 + Math.sqrt(2) is the same translation applied to the body triangle.


### Exercise 2

- The cube was easily built, by paying attention to the order of the vertices in the initBuffer function, to choose what side would be visible in each side.
- To create the painting:
  - We moved around the cube to better aproximate the center of the figure.
  - Rotate both of the objects at the same time.
  - To move it to the origin, we reversed the translations applied to the cube to be in center with the cat (to center the whole object on the origin) and then apply some simple translations (half of the sides of the "cube").


### Exercise 3

- The cube built using geometric transformations over the faces of the cube. The front and back faces of the cube were done in one push/pop sequence.