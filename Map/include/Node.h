#pragma once
#include<memory>
#include<vector>

using namespace std;
class Map;
class Node
{
private:
    /* data */
public:
    int x,y,type;
    shared_ptr<Map> map;
    Node(int x,int y,int type,shared_ptr<Map> map);
    //~Node();
    void reset(int x,int y,int type,shared_ptr<Map> map);
};
