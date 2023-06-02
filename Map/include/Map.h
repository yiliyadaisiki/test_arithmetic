#pragma once
#include<memory>
#include<vector>
#include<Node.h>

using namespace std;
class Map
{
private:
    int x_size;
    int y_size;
    vector<vector<shared_ptr<Node>>> map;
public:
    Map(int x,int y);
    shared_ptr<Node> findNode(int x,int y);
    shared_ptr<Node> setMap(int x,int y,int type);
    vector<shared_ptr<Node>> nodeRound(int x,int y);
    //~Map();
};

