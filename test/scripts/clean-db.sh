#!/bin/bash
#psql, name of database, -f, SQL location 
psql $1 -f ../../db/clean.sql 
psql $1 -f ../../db/populate.sql 
