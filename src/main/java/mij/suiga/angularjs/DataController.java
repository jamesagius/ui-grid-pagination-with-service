package mij.suiga.angularjs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.List;

@RestController
@RequestMapping(value = "/data")
public class DataController {

    private List<Map<String,Object>> data;

    @Autowired
    PlatStarDataRepository repository;

    @RequestMapping(value = "/getRecord", method = RequestMethod.GET)
    @ResponseBody
    Map<String,String> getRecord(@RequestParam(value = "name") String name) throws Exception {
        if (this.data == null) {
            this.data = new ArrayList<Map<String, Object>>();
        }
        for (Map m: this.data) {
            String n = (String)m.get("name");
            if (n.equals(name)) {
                return m;
            }
        }
        throw new Exception("No record found");
    }

    @RequestMapping(value = "/get", method = RequestMethod.GET)
    @ResponseBody
    List<Map<String,Object>> get() {
        if (this.data == null) {
            this.data = new ArrayList<Map<String, Object>>();
        }
        return this.data;
    }

    @RequestMapping(value = "/add", method = RequestMethod.GET)
    @ResponseBody
    List<Map<String,Object>> add() {
        if (this.data == null) {
            this.data = new ArrayList<Map<String, Object>>();
        }
        Map<String,Object> m = new HashMap();
        m.put("name","name_"+UUID.randomUUID().toString());
        m.put("gender","gender_"+UUID.randomUUID().toString());
        m.put("company","company_"+UUID.randomUUID().toString());
        m.put("otherFieldOne","otherFieldOne_"+UUID.randomUUID().toString());
        m.put("otherFieldTwo","otherFieldTwo_"+UUID.randomUUID().toString());
        m.put("otherFieldThree","otherFieldThree_"+UUID.randomUUID().toString());

        this.data.add(m);

        PlatStarRecord record = new PlatStarRecord();
        record.setId((String)m.get("name"));
        record.setRecord(m);
        repository.save(record);

        return this.data;
    }

}
