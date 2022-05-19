module.exports = (function () {
  return {
    local: { // localhost
     host: 'database-live.cczbuchns9tw.ap-northeast-2.rds.amazonaws.com',
      port: '3306',
      user: 'lshadmin',
      password: 'leesi101!!',
      database: 'gsitm_live',
      multipleStatements: true,
      connectionLimit:30
/*      host: 'db-5h6ea.vpc-cdb.ntruss.com',
      port: '3306',
      user: 'oc_admin',
      password: 'itm!6700',
      database: 'COMMON',
      multipleStatements: true*/
    },
    edu01: { // real server db info
      host: 'db-5h6ea.vpc-cdb.ntruss.com',
      port: '3306',
      user: 'oc_admin',
      password: 'itm!6700',
      database: 'COMMON',
      multipleStatements: true,
      connectionLimit:30
    },
    edu02: { // real server db info
      host: 'db-5i7f4.vpc-cdb.ntruss.com',
      port: '3306',
      user: 'oc_admin',
      password: 'itm!6700',
      database: 'COMMON',
      multipleStatements: true,
      connectionLimit:30
    },
    edu03: { // real server db info
      host: 'db-5h6i6.vpc-cdb.ntruss.com',
      port: '3306',
      user: 'oc_admin',
      password: 'itm!6700',
      database: 'COMMON',
      multipleStatements: true,
      connectionLimit:30
    },
    edu04: { // real server db info
      host: 'db-5h6iq.vpc-cdb.ntruss.com',
      port: '3306',
      user: 'oc_admin',
      password: 'itm!6700',
      database: 'COMMON',
      multipleStatements: true,
      connectionLimit:30
    },
    ccb: { // real server db info
      host: 'db-5l3fs.vpc-cdb.ntruss.com',
      port: '3306',
      user: 'oc_admin',
      password: 'Ebsoncls#1',
      database: 'COMMON',
      multipleStatements: true,
      connectionLimit:30
    },
    ccn: { // real server db info
      host: 'db-5l3fd.vpc-cdb.ntruss.com',
      port: '3306',
      user: 'oc_admin',
      password: 'Ebsoncls#1',
      database: 'COMMON',
      multipleStatements: true,
      connectionLimit:30
    },
    chj: { // real server db info
      host: 'db-5l3eq.vpc-cdb.ntruss.com',
      port: '3306',
      user: 'oc_admin',
      password: 'Ebsoncls#1',
      database: 'COMMON',
      multipleStatements: true,
      connectionLimit:30
    },
    clb: { // real server db info
      host: 'db-5l3e4.vpc-cdb.ntruss.com',
      port: '3306',
      user: 'oc_admin',
      password: 'Ebsoncls#1',
      database: 'COMMON',
      multipleStatements: true,
      connectionLimit:30
    },
    cln: { // real server db info
      host: 'db-5l3dk.vpc-cdb.ntruss.com',
      port: '3306',
      user: 'oc_admin',
      password: 'Ebsoncls#1',
      database: 'COMMON',
      multipleStatements: true,
      connectionLimit:30
    },
    frc: { // real server db info
      host: 'db-5l3av.vpc-cdb.ntruss.com',
      port: '3306',
      user: 'oc_admin',
      password: 'Ebsoncls#1',
      database: 'COMMON',
      multipleStatements: true,
      connectionLimit:30
    },
    inc1: { // real server db info
      host: 'db-5kvrq.vpc-cdb.ntruss.com',
      port: '3306',
      user: 'oc_admin',
      password: 'Ebsoncls#1',
      database: 'COMMON',
      multipleStatements: true,
      connectionLimit:30
    },
    inc2: { // real server db info
      host: 'db-5kvs9.vpc-cdb.ntruss.com',
      port: '3306',
      user: 'oc_admin',
      password: 'Ebsoncls#1',
      database: 'COMMON',
      multipleStatements: true,
      connectionLimit:30
    },
    kaw: { // real server db info
      host: 'db-5l34s.vpc-cdb.ntruss.com',
      port: '3306',
      user: 'oc_admin',
      password: 'Ebsoncls#1',
      database: 'COMMON',
      multipleStatements: true,
      connectionLimit:30
    },
    ksb: { // real server db info
      host: 'db-5l375.vpc-cdb.ntruss.com',
      port: '3306',
      user: 'oc_admin',
      password: 'Ebsoncls#1',
      database: 'COMMON',
      multipleStatements: true,
      connectionLimit:30
    },
    ksn: { // real server db info
      host: 'db-5l359.vpc-cdb.ntruss.com',
      port: '3306',
      user: 'oc_admin',
      password: 'Ebsoncls#1',
      database: 'COMMON',
      multipleStatements: true,
      connectionLimit:30
    },
    kwj: { // real server db info
      host: 'db-5l385.vpc-cdb.ntruss.com',
      port: '3306',
      user: 'oc_admin',
      password: 'Ebsoncls#1',
      database: 'COMMON',
      multipleStatements: true,
      connectionLimit:30
    },
    kyg1: { // real server db info
      host: 'db-5kv7f.vpc-cdb.ntruss.com',
      port: '3306',
      user: 'oc_admin',
      password: 'Ebsoncls#1',
      database: 'COMMON',
      multipleStatements: true,
      connectionLimit:30
    },
    kyg2: { // real server db info
      host: 'db-5kv87.vpc-cdb.ntruss.com',
      port: '3306',
      user: 'oc_admin',
      password: 'Ebsoncls#1',
      database: 'COMMON',
      multipleStatements: true,
      connectionLimit:30
    },
    kyg3: { // real server db info
      host: 'db-5kvf3.vpc-cdb.ntruss.com',
      port: '3306',
      user: 'oc_admin',
      password: 'Ebsoncls#1',
      database: 'COMMON',
      multipleStatements: true,
      connectionLimit:30
    },
    kyg4: { // real server db info
      host: 'db-5kvqn.vpc-cdb.ntruss.com',
      port: '3306',
      user: 'oc_admin',
      password: 'Ebsoncls#1',
      database: 'COMMON',
      multipleStatements: true,
      connectionLimit:30
    },
    kyg5: { // real server db info
      host: 'db-5kvr6.vpc-cdb.ntruss.com',
      port: '3306',
      user: 'oc_admin',
      password: 'Ebsoncls#1',
      database: 'COMMON',
      multipleStatements: true,
      connectionLimit:30
    },
    pus: { // real server db info
      host: 'db-5l3ag.vpc-cdb.ntruss.com',
      port: '3306',
      user: 'oc_admin',
      password: 'Ebsoncls#1',
      database: 'COMMON',
      multipleStatements: true,
      connectionLimit:30
    },
    sej: { // real server db info
      host: 'db-5l3av.vpc-cdb.ntruss.com',
      port: '3306',
      user: 'oc_admin',
      password: 'Ebsoncls#1',
      database: 'COMMON',
      multipleStatements: true,
      connectionLimit:30
    },
    sel1: { // real server db info
      host: 'db-5kuhh.vpc-cdb.ntruss.com',
      port: '3306',
      user: 'oc_admin',
      password: 'Ebsoncls#1',
      database: 'COMMON',
      multipleStatements: true,
      connectionLimit:30
    },
    sel2: { // real server db info
      host: 'db-5kuu3.vpc-cdb.ntruss.com',
      port: '3306',
      user: 'oc_admin',
      password: 'Ebsoncls#1',
      database: 'COMMON',
      multipleStatements: true,
      connectionLimit:30
    },
    sel3: { // real server db info
      host: 'db-5kv33.vpc-cdb.ntruss.com',
      port: '3306',
      user: 'oc_admin',
      password: 'Ebsoncls#1',
      database: 'COMMON',
      multipleStatements: true,
      connectionLimit:30
    },
    tae: { // real server db info
      host: 'db-5l38n.vpc-cdb.ntruss.com',
      port: '3306',
      user: 'oc_admin',
      password: 'Ebsoncls#1',
      database: 'COMMON',
      multipleStatements: true,
      connectionLimit:30
    },
    taj: { // real server db info
      host: 'db-5l39h.vpc-cdb.ntruss.com',
      port: '3306',
      user: 'oc_admin',
      password: 'Ebsoncls#1',
      database: 'COMMON',
      multipleStatements: true,
      connectionLimit:30
    },
    usn: { // real server db info
      host: 'db-5l3bd.vpc-cdb.ntruss.com',
      port: '3306',
      user: 'oc_admin',
      password: 'Ebsoncls#1',
      database: 'COMMON',
      multipleStatements: true,
      connectionLimit:30
    }

  }
})();
