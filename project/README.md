# CGRA 2020/2021

## Group T04G02

## Project Notes

### Part 1

- We created a class vector3 to help us organize our data and code better
- We tried to implement a realistic movement system. For this, we created an auxiliary variable that measures the update interval time in seconds. Then, instead of applying directly oldPosition + velocity, we use oldPosition + deltaTime\*velocity, simulating the formula x = v\*t. By calling checkKeys on update, we can also update the object velocity and rotation with deltaTime, simulating v = a\*t and angle = w\*t. We also added some items relative to this, such as acceleration (units² / 2), max velocity (units / s) and rotation velocity (deegrees / s)..
- When the 'W' or 'S' keys are pressed we want to start accelerating at that exact update period. To do this we record the acceleration of the previous frame, if it was zero then velocity stays the same, if it is non zero and current acceleration is non zero then this means that either the 'W' or 'S' keys were pressed on the last update and so velocity should be updated.
- We added an aditional movement option which is drag. Under Scene Physics, this value can be tweaked and toggled.

### Part 2

#### Cube

- Some transformation matrices were applied in order to invert the cube inside out, the majority of them was a mirror around the YZ
- We added some cube maps
  - [Space cubemap generated randombly using this website](https://wwwtyro.github.io/space-3d/)
  - [Mountain cubemap](http://www.humus.name/index.php?page=Cubemap&item=Ryfjallet)
- Sometimes these cubemaps would have a line on the corners, so we scaled every face of the cube on every axis by 1.001 factor.

#### Cylinder

- To build the cylinder we generated vertices, normals, faces and defined texture coordinates. For this to work, we used a variable number of slices and calculated the angle increment in each step. The vertices had the positions r\*v(cos(θ), 0, sin(θ)) and r\*v(cos(θ), h, sin(θ)) and the normals were n(cos(θ), 0, sin(θ)), according to the Gouraud Smooth Shading method. Finally, to correctly have a texture built into the cylinder, we had to create 2 extra vertices, at the same position of the first 2 vertices, so that the first vertex would have coordinates 0 and 1. We also added a gui entry to controll the number of slices of the cylinder.

### Sphere

- The sphere has texture coordinates as follows:
  - 0,0 to 1,0 in the north pole. In the top of the sphere, we will find multiple vertices.
  - 0,1 to 1,1 in the south pole. In the bottom of the sphere, we will find multiple vertices.
  - According to the code of the sphere, it will create the vertices iterating through the s coordinates of the texture for each iteration of the t coordinates (longitude over each latitude).
- All we did in this part was to push to the texCoords array the values the percentage of longitude and latitude visited in each iteration of the double for loop. This means that after adding a vertex to the vertices array, we pushed the values longitude/this.longDivs and latitude/this.latDivs to the texCoords array.

## Part 3

### Additional controls

- Some controls were already in effect in previous version of the code such as selection of the cubemap textures. That option is under Skybox folder.
- We created the scale factor controller which was placed under Vehicle folder. For this, we simply added a scaleFactor variable in the controllable class and applied the scaling transformation matrix. This matrix must be the first one in the transformations chain, therefore it appears right before display.
- We also added the scene speed controllable under Scene Physics folder. For this matter, we had to create some auxiliary variables. We were already using a function `updateDeltaTime`. As explained before, delta time is the time between update calls. This is used to get an accurate representation of units per second in movement physics. We refactored this function by modifying and creating new variables:
  - fixedLastUpdate, which indicates the last real `t` value. This variable is extremely important to calculate the real time between updates, otherwise this would be affected over and over again by the speed factor.
  - lastPhysicsUpdate, which indicates the last `t` value affected by time factor. In the future, instead of passing t to the animations, we shall use this `lastPhysicsUpdate`, since it is affected by the time factor. We tested with the water shader animation example, passing the value `lastPhysicsUpdate` instead of `t` and the speed of the vehicle and sphere animation are working accordingly to the speedFactor.
- With this new variables, we can do some important calculations:
  - lastDelta is now affected by timeFactor: (t - this.lastFixedUpdate)/1000 \* this.speedFactor. This affects the controllable object movement.
  - lastPhysicsUpdate is calculated with this.lastPhysicsUpdate + this.lastDelta. Since lastDelta is affected by timeFactor, so will lastUpdate.
  - lastFixedUpdate is the current timetamp `t`. This is always the real value without being affected by timeFactor.
- Throughout the project we changed the UI folder structure to be more clean and understandable.
  - Created vehicle folder with parameters like acceleration, max velocity, rotation speed and its size.
  - In the cylinder folder we can update its properties, like the number of slices.
  - Under Scene Physics we added drag coefficient and a checkbox to activate and deactivate this simulation option. The speed factor of the scene is also located in this folder.
  - All of the checkboxes related to choosing what objects to render are located under Display Scene Objects.
  - Under Skybox folder, the skybox's texture can be chosen, as previously said.

### Part 4

- To create the fish, we used a sphere to serve as a body. The orientation chosen was the z-Axis as the front facing direction of the fish. The sphere used had a radius of 1 unit, therefore we had to normalize it dividing by 2. After this, we scaled the spehere according to the parameters of the constructor. Later we had to rotate the sphere so that the axis connecting poles would be parallel to the z-Axis, so that the texture closes on the front and back part, and not in the top and bottom, which looked strange. After this, we separated the tails and wings in different animated classes, so that in the future it is easier to animate and controll them. We applied transformations according to the scale and position parameters, so that the fish has the wings, eyes, tail and head in the correct place, no matter those values.
- Since the sphere ranges in any axis from [-1,1] then 60% of the sphere is (1-(-1))\*0.6 = 1.2, meaning (-1 + 1.2)=0.2 is the point where the texture of the fish stops being drawn.
- Because CGF disables sending the texture coordinates to the vertex shaders if a texture is not set (via the appearance applied for example) we set the scene.activeTexture to any texture to bypass that restriction.
- Fish Texture from https://gumroad.com/juliosillet?sort=page_layout#ufEtG
- The shader used for the body is being also used to the rest of the fish, by setting an uniform boolean value indicating if the texture should be drawn or only the color.
- We created a simple eye by using a shader, painting black near the top of the sphere.
- To enable animations, we created a class `MyRotationAnimatedObject`.The two derived classes `MyAnimatedWing` and `MyAnimatedTail` work the same way in terms of updating the rotation, so it made sense to use a parent class that `update` worked the same way, according to some variables like minimum and maximum rotation and its speed, which can be set in the constructor. This value is updated using the previously explained variable `lastDelta` so that animation speed is controlled by the whole scene speed.

### Part 5

- We created a simple castle using cubes, spheres and cylinders to server as the fish's nest.

#### Water surface shader

- To create this shader, we created a simple mathematical function, a linear regression, `offset=m*x+b`, where m is (upperLim - lowerLim) / 1.0 and b = lowerLim. This creates a line where the domain x[0,1] returns distortion\*[-0.5,0.5] (the offset). This distortion variable can be controlled in the interface.
- We noticed that the shader would not behave well if the offset + the current texture position would exceed the limits. We tested and found that subtracting (or summing if the calculated position result was less than 0) the remaining. For example if the calculated result was texture position 1.2, we would subtract the remainder (0.2), meaning that the result would be 0.8.

#### Rocks

- To build the rocks, we used a random function between values. We had a problem where the rock was not being closed. This was happening because the last vertex was having a different random value from the first vertex. This problem was was solved by storing the first vertex of each iteration through the stacks, so that the last longitude value would be the same vertex.
- The rock set class generates random rocks with random values, like position and rotation, and receives some values. One of them is the forbidden area (which should be the nest) where no rock will be placed.

#### Pillars

- Texture from https://texturehaven.com/tex/?t=wooden_rough_planks

## Screenshots

### 1 - MyFish

![Screenshot 1](docs/images/proj-t4g02-1.png)
