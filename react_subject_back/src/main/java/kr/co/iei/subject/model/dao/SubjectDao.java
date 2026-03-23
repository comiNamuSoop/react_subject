package kr.co.iei.subject.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.subject.model.vo.SearchSubject;
import kr.co.iei.subject.model.vo.Subject;

@Mapper
public interface SubjectDao {

	List<Subject> selectAll(SearchSubject request);

}
