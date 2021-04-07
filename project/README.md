# CGRA 2020/2021

## Group T0xG0y

## Project Notes

### Part 1

- We created a class vector3 to help us organize our data and code better
- We tried to implement a realistic movement system. For this, we created an auxiliary variable that measures the update interval time in seconds. Then, instead of applying directly oldPosition + velocity, we use oldPosition + deltaTime\*velocity, simulating the formula x = v\*t. By calling checkKeys on update, we can also update the object velocity and rotation with deltaTime, simulating v = a\*t and angle = w\*t. We also added some items relative to this, such as acceleration (units² / 2), max velocity (units / s) and rotation velocity (deegrees / s).
- We don't know yet the nature of the vehicle, so we implemented the rotation velocity to be directly proportional to the current velocity, so that backwards and forward transition movement is smooth.
