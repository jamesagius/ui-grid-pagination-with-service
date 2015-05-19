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

    @RequestMapping(value = "/getDefaultCountry", method = RequestMethod.GET)
    @ResponseBody
    String getDefaultCountry() throws Exception {
      return "CA";
    };

    @RequestMapping(value = "/getCountries", method = RequestMethod.GET)
    @ResponseBody
    List<Map<String,String>> getCountries() throws Exception {
        List<Map<String,String>> list = new ArrayList<>();
        Map<String,String> m = new HashMap<>();
        m.put("name","United States");
        m.put("digraph","US");
        list.add(m);

        m = new HashMap<>();
        m.put("name","Canada");
        m.put("digraph","CA");
        list.add(m);

        m = new HashMap<>();
        m.put("name","Pakistan");
        m.put("digraph","PK");
        list.add(m);

        m = new HashMap<>();
        m.put("name","China");
        m.put("digraph","CH");
        list.add(m);

        m = new HashMap<>();
        m.put("name","Russia");
        m.put("digraph","RU");
        list.add(m);

        return list;
    }

    @RequestMapping(value = "/getUser", method = RequestMethod.GET)
    @ResponseBody
    Map<String,Object> getUser() throws Exception {
        Map<String,Object> m = new HashMap<String, Object>();
        m.put("lacs", Arrays.asList("E012333","ABCDEFG"));
        m.put("comps", Arrays.asList("TK","SI","AA","BB"));
        return m;
    }

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
