package mij.suiga.angularjs;

import org.springframework.data.annotation.Id;

import java.util.Map;

/**
 * Created by jamesagius on 4/17/15.
 */
public class PlatStarRecord {
    @Id
    private String id;
    private Map<String,Object> record;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Map<String, Object> getRecord() {
        return record;
    }

    public void setRecord(Map<String, Object> record) {
        this.record = record;
    }
}
