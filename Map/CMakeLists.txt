cmake_minimum_required(VERSION 3.12)
project(YourProjectName)

# # 设置调试标志
# set(CMAKE_BUILD_TYPE Debug)

# # 添加调试信息
# set(CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} -g")

set(CMAKE_CXX_FLAGS "$ENV{CXXFLAGS} -rdynamic -O0 -ggdb -std=c++11 -Wall -Wno-deprecated -Werror -Wno-unused-function -Wno-builtin-macro-redefined")

file(GLOB CPP ${PROJECT_SOURCE_DIR}/src/*.cpp)

include_directories(include)


add_library(AStarlib SHARED src/AStar.cpp)
target_compile_options(AStarlib PRIVATE -Wno-unknown-pragmas)
# target_include_directories(AStar PUBLIC include)
# target_compile_options(AStar PUBLIC -g)

# link_directories(lib)
add_executable(test test.cpp)
add_dependencies(test AStarlib)
# find_library(TEST AStar ${PROJECT_SOURCE_DIR}/lib)
# message(${TEST})
target_link_libraries(test AStarlib)

SET(LIBRARY_OUTPUT_PATH ${PROJECT_SOURCE_DIR}/build/lib)