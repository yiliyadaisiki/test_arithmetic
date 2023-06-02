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
    struct Compare{
        bool operator()(shared_ptr<Node> a,shared_ptr<Node> b);
    };
    int x,y,type;
    int cost_sum,cost_now,estimate;
    bool serched=false;
    shared_ptr<Node> parent;
    shared_ptr<Map> map;
    Node(int x,int y,int type,shared_ptr<Map> map);
    ~Node();
    void reset(int x,int y,int type,shared_ptr<Map> map);
    vector<shared_ptr<Node>> AStar(shared_ptr<Node> end);
    std::vector<shared_ptr<Node>> nodeRound();
    int get_estimate(shared_ptr<Node> end);
};

class Map
{
private:
    int x_size;
    int y_size;
    vector<vector<shared_ptr<Node>>> map;
    vector<shared_ptr<Node>> serched;
public:
    Map(int x,int y);
    shared_ptr<Node> findNode(int x,int y);
    shared_ptr<Node> setMap(int x,int y,int type);
    std::vector<shared_ptr<Node>> nodeRound(int x,int y,shared_ptr<Node> parent);
    vector<shared_ptr<Node>> AStar(shared_ptr<Node> start,shared_ptr<Node> end);
    ~Map();
};
