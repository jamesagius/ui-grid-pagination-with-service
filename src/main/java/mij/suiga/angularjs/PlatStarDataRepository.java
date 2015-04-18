package mij.suiga.angularjs;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Map;

/**
 * Created by jamesagius on 4/17/15.
 */
public interface PlatStarDataRepository extends MongoRepository<PlatStarRecord,String> {
}
