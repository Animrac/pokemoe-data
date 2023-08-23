create table if not exists pokemon_ref
(
   national_id int unsigned not null
       primary key,
   name        varchar(20)  not null,
   constraint national_id
       unique (national_id)
);


create table ability_list
(
   name        varchar(20)  not null
       primary key,
   description varchar(150) not null,
   constraint name
       unique (name)
);


create table type_list
(
   type varchar(10) not null
       primary key,
   constraint type
       unique (type)
);


create table base_stats
(
   ID              int unsigned not null
       primary key,
   Attack          int unsigned not null,
   constraint Attack_Check
       check ( Attack > 0 and Attack < 256),
   Special_Attack  int unsigned not null,
   constraint SPAttack_Check
       check ( Special_Attack > 0 and Special_Attack < 256),
   Defense         int unsigned not null,
   constraint Defense_Check
       check ( Defense > 0 and Defense < 256),
   Special_Defense int unsigned not null,
   constraint SPDefense_Check
       check ( Special_Defense > 0 and Special_Defense < 256),
   Speed           int unsigned not null,
   constraint Speed_Check
       check ( Speed > 0 and Speed < 256),
   HP              int unsigned not null,
   constraint HP_Check
       check ( HP > 0 and HP < 256),
   constraint ID
       unique (ID),
   constraint base_stats_ibfk_1
       foreign key (ID) references pokemon_ref (national_id) on delete restrict on update cascade
);


create table breed_ref
(
   national_id int unsigned not null
       primary key,
   egg_group_1 varchar(20)  not null,
   egg_group_2 varchar(20) default null,
   hatch_time  int unsigned not null,
   constraint national_id
       unique (national_id),
   constraint breed_ref_ibfk_1
       foreign key (national_id) references pokemon_ref (national_id) on delete restrict on update cascade
);


create table evolve_ref
(
   national_id   int unsigned not null
       primary key,
   evolves_from  int unsigned null,
   evolve_method varchar(300) null,
   constraint national_id
       unique (national_id),
   constraint evolve_ref_ibfk_1
       foreign key (national_id) references pokemon_ref (national_id) on delete restrict on update cascade,
   constraint evolve_ref_ibfk_2
       foreign key (evolves_from) references pokemon_ref (national_id) on delete restrict on update cascade
);


create table other_ref
(
   national_id       int unsigned           not null
       primary key,
   male_gender_ratio decimal(5, 2)          not null,
   constraint ratio_check
       check ( male_gender_ratio >= 0 and male_gender_ratio <= 100 ),
   height            decimal(5, 1) unsigned not null,
   weight            decimal(5, 1) unsigned not null,
   catch_rate        decimal(5, 2)          not null,
   constraint catch_check
       check ( catch_rate >= 0 and catch_rate <= 100 ),
   level_rate        varchar(20)            not null,
   constraint national_id
       unique (national_id),
   constraint other_ref_ibfk_1
       foreign key (national_id) references pokemon_ref (national_id) on delete restrict on update cascade
);


create table pokemon_abilities
(
   national_id    int unsigned not null
       primary key,
   ability_1      varchar(20)  not null,
   ability_2      varchar(20)  null,
   hidden_ability varchar(20)  null,
   constraint national_id
       unique (national_id),
   constraint pokemon_abilities_ibfk_1
       foreign key (national_id) references pokemon_ref (national_id) on delete restrict on update cascade,
   constraint pokemon_abilities_ibfk_2
       foreign key (ability_1) references ability_list (name) on delete restrict on update cascade,
   constraint pokemon_abilities_ibfk_3
       foreign key (ability_2) references ability_list (name) on delete restrict on update cascade,
   constraint pokemon_abilities_ibfk_4
       foreign key (hidden_ability) references ability_list (name) on delete restrict on update cascade
);


create table pokemon_caught
(
   national_id int unsigned         not null
       primary key,
   caught      tinyint(1) default 0 not null,
   constraint national_id
       unique (national_id),
   constraint pokemon_caught_ibfk_1
       foreign key (national_id) references pokemon_ref (national_id) on delete restrict on update cascade
);


create table pokemon_location
(
   national_id int unsigned not null
       primary key,
   location    varchar(300) not null,
   constraint pokemon_location_ibfk_1
       foreign key (national_id) references pokemon_ref (national_id) on delete restrict on update cascade
);


create table pokemon_party
(
   slot int unsigned not null
       primary key,
   constraint slot_check
       check ( slot > 0 and slot < 7 ),
   ID   int unsigned null,
   constraint slot
       unique (slot),
   constraint pokemon_party_ibfk_1
       foreign key (ID) references pokemon_ref (national_id) on delete restrict on update cascade
);


create table pokemon_type
(
   national_id    int unsigned not null
       primary key,
   primary_type   varchar(10)  not null,
   secondary_type varchar(10)  null,
   constraint national_id
       unique (national_id),
   constraint pokemon_type_ibfk_1
       foreign key (primary_type) references type_list (type) on delete restrict on update cascade,
   constraint pokemon_type_ibfk_2
       foreign key (secondary_type) references type_list (type) on delete restrict on update cascade,
   constraint pokemon_type_ibfk_3
       foreign key (national_id) references pokemon_ref (national_id) on delete restrict on update cascade
);


create table type_ref
(
   attacking_type varchar(10)            not null
       primary key,
   normal         decimal(2, 1) unsigned not null,
   fighting       decimal(2, 1) unsigned not null,
   flying         decimal(2, 1) unsigned not null,
   poison         decimal(2, 1) unsigned not null,
   ground         decimal(2, 1) unsigned not null,
   rock           decimal(2, 1) unsigned not null,
   bug            decimal(2, 1) unsigned not null,
   ghost          decimal(2, 1) unsigned not null,
   steel          decimal(2, 1) unsigned not null,
   fire           decimal(2, 1) unsigned not null,
   water          decimal(2, 1) unsigned not null,
   grass          decimal(2, 1) unsigned not null,
   electric       decimal(2, 1) unsigned not null,
   psychic        decimal(2, 1) unsigned not null,
   ice            decimal(2, 1) unsigned not null,
   dragon         decimal(2, 1) unsigned not null,
   dark           decimal(2, 1) unsigned not null,
   constraint attacking_type
       unique (attacking_type),
   constraint type_ref_ibfk_1
       foreign key (attacking_type) references type_list (type) on delete restrict on update cascade
);


create table pokemon_pics
(
   national_id int unsigned not null
       primary key,
   sprite      longblob     null,
   icon_1      longblob     null,
   icon_2      longblob     null,
   constraint national_id
       unique (national_id),
   constraint pokemon_pics_ibfk_1
       foreign key (national_id) references pokemon_ref (national_id) on delete restrict on update cascade
);
