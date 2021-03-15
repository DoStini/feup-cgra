# CGRA 2020/2021

## Group T04G02

## TP 4 Notes

### Exercise 1

- To create the tangram with the correct texture, we first used the texture "tangram-lines" as it was easier to verify the correctness of the placing of the textures. With this exercise we understood how to place the textures using the coordinates.

### Exercise 2
- The cube wasn't very hard to implement. We sent through the constructor an array of texture materials.
- The trickier part was changing the mode from linear to magnify, as we found out that that transformation needed to be applied before every render of a face of the cube. We used a tick box in the UI to allow switching between the 2 modes.