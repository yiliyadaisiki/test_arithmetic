# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.22

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:

#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:

# Disable VCS-based implicit rules.
% : %,v

# Disable VCS-based implicit rules.
% : RCS/%

# Disable VCS-based implicit rules.
% : RCS/%,v

# Disable VCS-based implicit rules.
% : SCCS/s.%

# Disable VCS-based implicit rules.
% : s.%

.SUFFIXES: .hpux_make_needs_suffix_list

# Command-line flag to silence nested $(MAKE).
$(VERBOSE)MAKESILENT = -s

#Suppress display of executed commands.
$(VERBOSE).SILENT:

# A target that is always out of date.
cmake_force:
.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/bin/cmake

# The command to remove a file.
RM = /usr/bin/cmake -E rm -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/cx/cpp/Map

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/cx/cpp/Map/build

# Include any dependencies generated for this target.
include CMakeFiles/AStarlib.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include CMakeFiles/AStarlib.dir/compiler_depend.make

# Include the progress variables for this target.
include CMakeFiles/AStarlib.dir/progress.make

# Include the compile flags for this target's objects.
include CMakeFiles/AStarlib.dir/flags.make

CMakeFiles/AStarlib.dir/src/AStar.cpp.o: CMakeFiles/AStarlib.dir/flags.make
CMakeFiles/AStarlib.dir/src/AStar.cpp.o: ../src/AStar.cpp
CMakeFiles/AStarlib.dir/src/AStar.cpp.o: CMakeFiles/AStarlib.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/cx/cpp/Map/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object CMakeFiles/AStarlib.dir/src/AStar.cpp.o"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/AStarlib.dir/src/AStar.cpp.o -MF CMakeFiles/AStarlib.dir/src/AStar.cpp.o.d -o CMakeFiles/AStarlib.dir/src/AStar.cpp.o -c /home/cx/cpp/Map/src/AStar.cpp

CMakeFiles/AStarlib.dir/src/AStar.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/AStarlib.dir/src/AStar.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/cx/cpp/Map/src/AStar.cpp > CMakeFiles/AStarlib.dir/src/AStar.cpp.i

CMakeFiles/AStarlib.dir/src/AStar.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/AStarlib.dir/src/AStar.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/cx/cpp/Map/src/AStar.cpp -o CMakeFiles/AStarlib.dir/src/AStar.cpp.s

# Object files for target AStarlib
AStarlib_OBJECTS = \
"CMakeFiles/AStarlib.dir/src/AStar.cpp.o"

# External object files for target AStarlib
AStarlib_EXTERNAL_OBJECTS =

lib/libAStarlib.so: CMakeFiles/AStarlib.dir/src/AStar.cpp.o
lib/libAStarlib.so: CMakeFiles/AStarlib.dir/build.make
lib/libAStarlib.so: CMakeFiles/AStarlib.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/cx/cpp/Map/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX shared library lib/libAStarlib.so"
	$(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/AStarlib.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
CMakeFiles/AStarlib.dir/build: lib/libAStarlib.so
.PHONY : CMakeFiles/AStarlib.dir/build

CMakeFiles/AStarlib.dir/clean:
	$(CMAKE_COMMAND) -P CMakeFiles/AStarlib.dir/cmake_clean.cmake
.PHONY : CMakeFiles/AStarlib.dir/clean

CMakeFiles/AStarlib.dir/depend:
	cd /home/cx/cpp/Map/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/cx/cpp/Map /home/cx/cpp/Map /home/cx/cpp/Map/build /home/cx/cpp/Map/build /home/cx/cpp/Map/build/CMakeFiles/AStarlib.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : CMakeFiles/AStarlib.dir/depend

