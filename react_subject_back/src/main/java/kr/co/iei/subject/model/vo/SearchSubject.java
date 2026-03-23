package kr.co.iei.subject.model.vo;

import lombok.Data;

@Data
public class SearchSubject {
	private Integer category;
	private Integer level;
	private Integer order;
	private String searchKeyword;

}
