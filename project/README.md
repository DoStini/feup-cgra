# CGRA 2020/2021

## Group T04G02

## Project Notes

### Part 1

- We created a class vector3 to help us organize our data and code better
- We tried to implement a realistic movement system. For this, we created an auxiliary variable that measures the update interval time in seconds. Then, instead of applying directly oldPosition + velocity, we use oldPosition + deltaTime\*velocity, simulating the formula x = v\*t. By calling checkKeys on update, we can also update the object velocity and rotation with deltaTime, simulating v = a\*t and angle = w\*t. We also added some items relative to this, such as acceleration (units² / 2), max velocity (units / s) and rotation velocity (deegrees / s).
- When the 'W' or 'S' keys are pressed we want to start accelerating at that exact update period. To do this we record the acceleration of the previous frame, if it was zero then velocity stays the same, if it is non zero and current acceleration is non zero then this means that either the 'W' or 'S' keys were pressed on the last update and so velocity should be updated.
- We added an aditional movement option which is drag. Under Scene Physics, this value can be tweaked and toggled.

### Part 2

- Some transformation matrices were applied in order to invert the cube inside out
- We added some cube maps
  - [Space cubemap generated randombly using this website](https://wwwtyro.github.io/space-3d/)
  - [Mountain cubemap](http://www.humus.name/index.php?page=Cubemap&item=Ryfjallet)
