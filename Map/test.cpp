#include "AStar.h"
#include<iostream>

int main(){
    shared_ptr<Map> map= make_shared<Map>(3,3);
    auto a = map->setMap(0,1,10);
    auto b = map->setMap(2,1,10);
    auto node=map->findNode(0,0);
    auto nodes= node->AStar(map->findNode(2,2));
    // vector<shared_ptr<Node>> nodes=map->nodeRound(1,1);
    for(auto node:nodes){
        std::cout<<node->x <<"    "<<node->y<<endl;
    }
}