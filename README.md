# Administrative Regions of The Czech Republic - Databases 2 Project
Created by:
- Oskar Gusta (back-end)
- Konrad Skowron (front-end, dockerization)

## [Check out the demo!](http://map.eurasianskylark.pl)
This project's demo is currently deployed on Google Cloud

## Compile and implement
This project handles dependancies automatically, so it is not necessary to install anything but CMake, Ninja and a compiler.

- Create a postgres database
- Fill out the connection string https://github.com/konrad-skowron/czech-division-map/blob/2abc63dc7d05bcb6ece349a859f0a14c7cc485a4/CMakeLists.txt#L135
- Compile and run
```
$ mkdir build && cd build
$ cmake .. -G Ninja -DCMAKE_BUILD_TYPE=Release -DCMAKE_MAKE_PROGRAM=ninja
$ ninja
$ ./src/uni_bd2_backend-exe
$ ./frontend/index.js
```
