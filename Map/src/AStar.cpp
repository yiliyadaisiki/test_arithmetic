#include"AStar.h"
#include<queue>
#include<math.h>
#include <algorithm>

#pragma region map
Node::Node(int x,int y,int type,shared_ptr<Map> map):x(x),y(y),type(type),map(map){
    
}

void Node::reset(int x, int y, int type, shared_ptr<Map> map){
    this->x=x;
    this->y=y;
    this->type=type;
    this->map=map;
}

Node::~Node(){

}

vector<shared_ptr<Node>> Node::AStar(shared_ptr<Node> end){
    return map->AStar(shared_ptr<Node>(this),end);
}

std::vector<shared_ptr<Node>> Node::nodeRound(){
    return map->nodeRound(x,y,shared_ptr<Node>(this));
}

bool Node::Compare::operator()(shared_ptr<Node> a,shared_ptr<Node> b){
    return a->cost_sum > b->cost_sum;
}

int Node::get_estimate(shared_ptr<Node> end){
    estimate=abs(end->x-x)+abs(end->y-y);
    return estimate;
}
#pragma endregion

#pragma region node
Map::Map(int x,int y):x_size(x),y_size(y){
    map.resize(x_size, vector<shared_ptr<Node>>(y_size));
}

shared_ptr<Node> Map::setMap(int x,int y,int type){
    auto node = findNode(x,y);
    if(node){
        node->type=type;
        return node;
    }else{
        return nullptr;
    }
}

shared_ptr<Node> Map::findNode(int x,int y){
    if(!(0 <= x && x < x_size && 0 <= y && y < y_size)){
        return nullptr;
    }
    auto& line_y = map[x];
    if(line_y[y]){
        return line_y[y];
    }else{
        shared_ptr<Node> node=make_shared<Node>(x,y,0,shared_ptr<Map>(this));
        line_y[y]=node;
        return line_y[y];
    }
}

std::vector<shared_ptr<Node>> Map::nodeRound(int x,int y,shared_ptr<Node> parent){
    if(!parent->serched){
        parent->serched=true;
        serched.push_back(parent);
    }
    vector<shared_ptr<Node>> round;
    auto node=findNode(x,y+1);

    if(node&&!node->serched&&node->type<10){
        node->serched=true;
        node->parent=parent;
        node->cost_now=10;
        node->cost_sum=node->cost_now+parent->cost_sum;
        serched.push_back(node);
        round.push_back(node);
    }
    node=findNode(x,y-1);
    if(node&&!node->serched&&node->type<10){
        node->serched=true;
        node->parent=parent;
        node->cost_now=10;
        node->cost_sum=node->cost_now+parent->cost_sum;
        serched.push_back(node);
        round.push_back(node);
    }
    node=findNode(x+1,y);
    if(node&&!node->serched&&node->type<10){
        node->serched=true;
        node->parent=parent;
        node->cost_now=10;
        node->cost_sum=node->cost_now+parent->cost_sum;
        serched.push_back(node);
        round.push_back(node);
    }
    node=findNode(x-1,y);
    if(node&&!node->serched&&node->type<10){
        node->serched=true;
        node->parent=parent;
        node->cost_now=10;
        node->cost_sum=node->cost_now+parent->cost_sum;
        serched.push_back(node);
        round.push_back(node);
    }

    return round;
}

vector<shared_ptr<Node>> Map::AStar(shared_ptr<Node> start,shared_ptr<Node> end){
    priority_queue<shared_ptr<Node>, std::vector<shared_ptr<Node>>, Node::Compare> serching_node;
    vector<shared_ptr<Node>> serched_node;
    shared_ptr<Node> now_node=start;
    while(now_node!=end){
        serched_node.push_back(now_node);
        vector<shared_ptr<Node>> rounds=nodeRound(now_node->x, now_node->y,now_node);
        if(rounds.empty()){
            if(!serching_node.empty()){
                now_node=serching_node.top();
                serching_node.pop();
                continue;
            }else{
                return {};
            }
        }
        sort(rounds.begin(),rounds.end(),[end](shared_ptr<Node> a,shared_ptr<Node> b){
            return a->get_estimate(end)>b->get_estimate(end);
        });
        now_node = rounds.back();
        rounds.pop_back();
        for(auto node:rounds){
            serching_node.push(node);
        }
    }
    serched_node.clear();
    serched_node.push_back(now_node);
    do
    {
        now_node=now_node->parent;
        serched_node.push_back(now_node);
    }while (now_node->parent);
    reverse(serched_node.begin(),serched_node.end());
    
    for(auto node:serched){
        node->serched=false;
        node->parent.reset();
    }
    serched.clear();

    return serched_node;
}

Map::~Map(){
    
}
#pragma endregion